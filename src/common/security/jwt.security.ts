import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { TokenContent } from '@/modules/auth/dtos/token-content.dto';
import { jwtConfig } from '@/configs/jwt.config';

@Injectable()
export class JwtSecurity {
  genToken(content: TokenContent): string {
    return sign(content, jwtConfig.secretKey, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
  }
}
